using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Antss.Data.Migrations
{
    public partial class SeedInitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ContactNumber", "EmailAddress", "FirstName", "LastName", "Location", "UserType" },
                values: new object[] { 1, "foo", "foo", "Adam", "Smith", "foo", 3 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ContactNumber", "EmailAddress", "FirstName", "LastName", "Location", "UserType" },
                values: new object[] { 2, "foo", "foo", "John", "Jones", "foo", 2 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ContactNumber", "EmailAddress", "FirstName", "LastName", "Location", "UserType" },
                values: new object[] { 3, "foo", "foo", "Peter", "Taylor", "foo", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
