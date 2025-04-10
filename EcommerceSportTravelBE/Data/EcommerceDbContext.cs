using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using EcommerceSportTravelBE.Models;
using Microsoft.AspNetCore.Identity;

namespace EcommerceSportTravelBE.Data
{
    public class EcommerceDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string,
        IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options)
            : base(options)
        {
        }

        public DbSet<Squadra> Squadre { get; set; }
        public DbSet<Citta> Citta { get; set; }
        public DbSet<Partita> Partite { get; set; }
        public DbSet<PacchettoViaggio> PacchettiViaggio { get; set; }
        public DbSet<Prenotazione> Prenotazioni { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configura relazioni personalizzate per ApplicationUserRole
            builder.Entity<ApplicationUserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            builder.Entity<ApplicationUserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.ApplicationUserRoles)
                .HasForeignKey(ur => ur.UserId);

            builder.Entity<ApplicationUserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.ApplicationUserRoles)
                .HasForeignKey(ur => ur.RoleId);

            // Configura le relazioni multiple in Partita (SquadraCasa e SquadraOspite)
            builder.Entity<Partita>()
                .HasOne(p => p.SquadraCasa)
                .WithMany(s => s.PartiteCasa)
                .HasForeignKey(p => p.SquadraCasaId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Partita>()
                .HasOne(p => p.SquadraOspite)
                .WithMany(s => s.PartiteOspite)
                .HasForeignKey(p => p.SquadraOspiteId)
                .OnDelete(DeleteBehavior.Restrict);
          
            builder.Entity<PacchettoViaggio>()
                .HasOne(p => p.Partita)
                .WithMany(pa => pa.Pacchetti)
                .HasForeignKey(p => p.PartitaId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
