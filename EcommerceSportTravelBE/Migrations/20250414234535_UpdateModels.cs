using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceSportTravelBE.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CittaId",
                table: "Squadre",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Durata",
                table: "PacchettiViaggio",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_Squadre_CittaId",
                table: "Squadre",
                column: "CittaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Squadre_Citta_CittaId",
                table: "Squadre",
                column: "CittaId",
                principalTable: "Citta",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Squadre_Citta_CittaId",
                table: "Squadre");

            migrationBuilder.DropIndex(
                name: "IX_Squadre_CittaId",
                table: "Squadre");

            migrationBuilder.DropColumn(
                name: "CittaId",
                table: "Squadre");

            migrationBuilder.DropColumn(
                name: "Durata",
                table: "PacchettiViaggio");

            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
