using System.Collections.Generic;
using SimpleLinkManager.Repositories.CodeFirstDB;

namespace SimpleLinkManager.Repositories.Abstraction
{
    public interface ILinkRepository
    {
        IEnumerable<Link> SelectAll();
        Link SelectByID(int id);
        Link Insert(Link link);
        Link Update(Link link);
        void Delete(int id);
        void Save();
    }
}
