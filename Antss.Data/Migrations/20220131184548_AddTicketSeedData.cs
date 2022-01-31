using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Antss.Data.Migrations
{
    public partial class AddTicketSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "AssignedToId", "Description", "RaisedById", "TicketStatus" },
                values: new object[,]
                {
                    { 4, null, "Virus?", 4, 1 },
                    { 5, null, "Printer won't print", 4, 1 },
                    { 6, null, "Can't access reddit", 4, 1 },
                    { 7, null, "issue with email", 5, 1 },
                    { 8, null, "No WiFi", 5, 1 },
                    { 9, null, "Proto app is crashing when I login", 6, 1 },
                    { 10, null, "why doesn't reddit work any more?", 7, 1 },
                    { 11, null, "Wifi issues", 7, 1 },
                    { 12, null, "Can't login", 7, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Tickets",
                keyColumn: "Id",
                keyValue: 12);
        }
    }
}
