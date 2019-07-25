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
            CreateMap<User, UserToReturnDto>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>();
            CreateMap<Assignment, AssignmentForListDto>();
            CreateMap<Assignment, AssignmentForCreationDto>();
            CreateMap<Assignment, AssignmentToReturnDto>();
        }
    }
}