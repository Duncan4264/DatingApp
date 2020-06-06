using Microsoft.EntityFrameworkCore;
using DatingApp.API.Properties.Models;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Value> Values { get; set; }
    }
} 