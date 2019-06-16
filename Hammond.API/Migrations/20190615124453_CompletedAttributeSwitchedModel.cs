using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class CompletedAttributeSwitchedModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Assignments");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "UserAssignments",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "UserAssignments");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Assignments",
                nullable: false,
                defaultValue: false);
        }
    }
}
