using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Antss.Data.Migrations
{
    public partial class UpdateSeedUserePasswords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AN9E9yNXuji6LWGi1MxXBoml+81YNZ9I3evXWwl203n1SbndNydZvZALGUru2COlzw==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "ALlC854bivaKC4w9iH5CE/1Xezy29gcmX8xhoqnLUAsReYnb2VxEbE0GPrvJWhTxtw==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "AHaYNZKBoiHHYOqmPE/K8c0q4tEHXBatfk1+mGNWEuuw+E2Khv2ECk8c4EbHriJmKQ==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "test");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "test");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "test");
        }
    }
}
