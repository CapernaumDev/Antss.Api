using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Antss.Data.Migrations
{
    public partial class UpdateSeedTicketData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "No monitor display");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "PC IS ON FIRE");
        }
    }
}
