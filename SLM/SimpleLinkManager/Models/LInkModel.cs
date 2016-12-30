using SimpleLinkManager.Repositories.CodeFirstDB;

namespace SimpleLinkManager.Models
{
    public class LinkModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }

        public static explicit operator Link (LinkModel linkModel)
        {
            Link linkEntity = new Link()
            {
                Id = linkModel.Id,
                Title = linkModel.Title,
                Date = linkModel.Date
            };
            return linkEntity;
        }

        public static explicit operator LinkModel(Link linkEntity)
        {
            LinkModel linkModel = new LinkModel()
            {
                Id = linkEntity.Id,
                Title = linkEntity.Title,
                Date = linkEntity.Date
            };
            return linkModel;
        }
    }
}