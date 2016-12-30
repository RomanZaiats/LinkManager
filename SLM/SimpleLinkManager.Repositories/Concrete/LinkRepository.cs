using System.Collections.Generic;
using System.Linq;
using SimpleLinkManager.Repositories.Abstraction;
using System.Data.Entity;
using SimpleLinkManager.Repositories.CodeFirstDB;

namespace SimpleLinkManager.Repositories.Concrete
{
    public class LinkRepository: ILinkRepository
    {
        private LinkContext db = new LinkContext();

        public LinkRepository()
        {
        }

        public void Delete(int id)
        {
            Link existing = db.Links.Find(id);
            db.Links.Remove(existing);
        }

        public Link Insert(Link link)
        {
            db.Links.Add(link);
            return link;
        }

        public void Save()
        {
            db.SaveChanges();   
        }

        public IEnumerable<Link> SelectAll()
        {
            return db.Links.ToList();
        }

        public Link SelectByID(int id)
        {
            return db.Links.Find(id);
        }

        public Link Update(Link link)
        {
            db.Entry(link).State = EntityState.Modified;
            return link;
        }
    }
}
