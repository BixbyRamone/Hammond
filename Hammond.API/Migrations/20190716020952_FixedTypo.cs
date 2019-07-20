using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class FixedTypo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contnet",
                table: "Assignments",
                newName: "Content");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Assignments",
                newName: "Contnet");
        }
    }
}
