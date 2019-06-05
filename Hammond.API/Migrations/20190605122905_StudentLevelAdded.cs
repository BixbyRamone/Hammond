using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class StudentLevelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudentLevel",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentLevel",
                table: "AspNetUsers");
        }
    }
}
