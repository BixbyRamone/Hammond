using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hammond.API.Migrations
{
    public partial class AssignmentDateAssignedNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAssigned",
                table: "Assignments",
                nullable: true,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAssigned",
                table: "Assignments",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
