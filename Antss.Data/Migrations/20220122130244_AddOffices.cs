using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Antss.Data.Migrations
{
    public partial class AddOffices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "OfficeId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Office",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Office", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Office",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Office 1" });

            migrationBuilder.InsertData(
                table: "Office",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Office 2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "OfficeId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "OfficeId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "OfficeId",
                value: 2);

            migrationBuilder.CreateIndex(
                name: "IX_Users_OfficeId",
                table: "Users",
                column: "OfficeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Office_OfficeId",
                table: "Users",
                column: "OfficeId",
                principalTable: "Office",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Office_OfficeId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Office");

            migrationBuilder.DropIndex(
                name: "IX_Users_OfficeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OfficeId",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Users",
                type: "nvarchar(254)",
                maxLength: 254,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Location",
                value: "foo");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Location",
                value: "foo");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Location",
                value: "foo");
        }
    }
}
