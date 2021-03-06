using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Dtos;
using Hammond.API.Helpers;
using Hammond.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hammond.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IHammondRepository _repo;
        public MessagesController(IHammondRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();   

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId,
            [FromQuery]MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;

            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessageThread(userId, recipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messageThread);
        }

        [HttpGet("assignment/{assignmentId}")]
        public async Task<IActionResult> GetAssignmentMessages(int userId, int assignmentId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // convoluted way of getting groupId
            var user = await _repo.GetUser(userId);
            var u = user.UserGroups;
            var groupId = 0;
            foreach (var ug in u)
            {
                groupId = ug.GroupId;
                break;
            }

            var messagesForAssignment = await _repo.GetAssignmentMessages(assignmentId, groupId);

            var messagesToReturn = _mapper.Map<IEnumerable<AssignmentMessageToReturnDto>>(messagesForAssignment);

            return Ok(messagesToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, [FromBody]MessageForCreationDto messageForCreationDto)
        {
            var sender = await _repo.GetUser(userId);

            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            messageForCreationDto.SenderId = userId;

            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);
            

            if (recipient == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<Message>(messageForCreationDto);
            
            _repo.Add(message);

            

            if (await _repo.SaveAll()) {
                var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                
                return CreatedAtRoute("GetMessage", new {id = message.Id}, messageToReturn);
            }
                

            throw new Exception("Creating the message failed on save");
        }

        [HttpPost("assignment")]
        public async Task<IActionResult> CreateAssignmentMessage(int userId, [FromBody]AssignmentMessageForCreationDto assignmentMessageForCreationDto)
        {
            var sender = await _repo.GetUser(userId);

            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            assignmentMessageForCreationDto.SenderId = userId;

            for (int i = 0; i < assignmentMessageForCreationDto.RecipientIds.Length; i++)
            {
                var recipient = await _repo.GetUser(assignmentMessageForCreationDto.RecipientIds[i]);

                var message = _mapper.Map<Message>(assignmentMessageForCreationDto);
                message.RecipientId = recipient.Id;
                message.Recipient = recipient;

                _repo.Add(message);
            }

            var assignmentMessage = _mapper.Map<AssignmentMessage>(assignmentMessageForCreationDto);
            
            _repo.Add(assignmentMessage);

            

            if (await _repo.SaveAll()) {
                var messageToReturn = _mapper.Map<AssignmentMessageToReturnDto>(assignmentMessage);
                
                return CreatedAtRoute("GetMessage", new {id = assignmentMessage.Id}, messageToReturn);
            }
                

            throw new Exception("Creating the message failed on save");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo.SenderId == userId)
                messageFromRepo.SenderDeleted = true;

            if (messageFromRepo.RecipientId == userId)
                messageFromRepo.RecipientDeleted = true;

            if (messageFromRepo.RecipientDeleted && messageFromRepo.SenderDeleted)
                _repo.Delete(messageFromRepo);

            if(await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error Deleting Message");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();
        }
    }
}