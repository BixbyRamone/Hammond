using Hammond.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hammond.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        
        public DbSet<ActScore> ActScores { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Value> Values { get; set; }
        public DbSet<UserAssignment> UserAssignments { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<AssignmentMessage> AssignmentMessages { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<UserAssignment>(userAssignment => 
            {
                userAssignment.HasKey(ua => new {ua.UserId, ua.AssignmentId});

                userAssignment.HasOne(ua => ua.User)
                .WithMany(u => u.UserAssignments)
                .HasForeignKey(ua => ua.UserId)
                .IsRequired();

                userAssignment.HasOne(ua => ua.Assignment)
                .WithMany(a => a.UserAssignments)
                .HasForeignKey(ua => ua.AssignmentId)
                .IsRequired();
            });
                       
            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AssignmentMessage>()
                .Ignore(am => am.RecipientIds);

            builder.Entity<UserGroup>(userGroup => {
                userGroup.HasKey(ug => new {ug.UserId, ug.GroupId});

                userGroup.HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(ug => ug.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

                userGroup.HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ug => ug.UserId)
                .OnDelete(DeleteBehavior.Restrict); 
            });
        }
    }
}