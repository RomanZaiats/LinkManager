using System.Data.Entity;

namespace SimpleLinkManager.Repositories.CodeFirstDB
{
    public class LinkContext: DbContext
    {
        public LinkContext() : base("CodeFirstLinkManagerDB") { }
        public DbSet<Link> Links { get; set; }
    }
}
