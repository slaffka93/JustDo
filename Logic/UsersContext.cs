using Microsoft.EntityFrameworkCore;
using System;

namespace JustDo.Logic
{
    public class UsersContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public UsersContext(DbContextOptions<UsersContext> options) : base(options) { }
    }

    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
