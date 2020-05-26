using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class ActTestCats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EnglishScore",
                table: "ActScores",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MathmaticsScore",
                table: "ActScores",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReadingScore",
                table: "ActScores",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ScienceScore",
                table: "ActScores",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WritingScore",
                table: "ActScores",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnglishScore",
                table: "ActScores");

            migrationBuilder.DropColumn(
                name: "MathmaticsScore",
                table: "ActScores");

            migrationBuilder.DropColumn(
                name: "ReadingScore",
                table: "ActScores");

            migrationBuilder.DropColumn(
                name: "ScienceScore",
                table: "ActScores");

            migrationBuilder.DropColumn(
                name: "WritingScore",
                table: "ActScores");
        }
    }
}
