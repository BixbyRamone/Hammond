using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class SessAssignsAddedToEnts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Sessions_SessionId",
                table: "Assignments");

            migrationBuilder.DropIndex(
                name: "IX_Assignments_SessionId",
                table: "Assignments");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "Assignments");

            migrationBuilder.CreateTable(
                name: "SessionAssignment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SessionId = table.Column<int>(nullable: false),
                    AssignmentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionAssignment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionAssignment_Assignments_AssignmentId",
                        column: x => x.AssignmentId,
                        principalTable: "Assignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionAssignment_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionAssignment_AssignmentId",
                table: "SessionAssignment",
                column: "AssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionAssignment_SessionId",
                table: "SessionAssignment",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SessionAssignment");

            migrationBuilder.AddColumn<int>(
                name: "SessionId",
                table: "Assignments",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_SessionId",
                table: "Assignments",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Sessions_SessionId",
                table: "Assignments",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
