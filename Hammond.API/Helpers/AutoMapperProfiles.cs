using AutoMapper;
using Hammond.API.Dtos;
using Hammond.API.Models;

namespace Hammond.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<User, UserForListDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<User, UserToReturnDto>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<AssignmentMessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>();
            CreateMap<Assignment, AssignmentForListDto>();
            CreateMap<AssignmentForCreationDto, Assignment>();
            CreateMap<Assignment, AssignmentToReturnDto>();
            CreateMap<Group, GroupForListDto>();
            CreateMap<EventForCreationDto, Event>();
            CreateMap<Event,  EventToReturnDto>();
            CreateMap<EventForUpdateDto, Event>();
            CreateMap<SessionForCreationDto, Session>();
            CreateMap<Session, SessionToReturnDto>();
            CreateMap<AssignmentMessageForCreationDto, AssignmentMessage>().ReverseMap();
            CreateMap<AssignmentMessage, AssignmentMessageToReturnDto>();

        }
    }
}