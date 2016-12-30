using System.Web.Mvc;
using SimpleLinkManager.Repositories.Abstraction;
using SimpleLinkManager.Repositories.Concrete;
using SimpleLinkManager.Models;
using System.Data.Entity.Validation;
using SimpleLinkManager.Repositories.CodeFirstDB;

namespace SimpleLinkManager.Controllers
{
    public class LinkController : Controller
    {
        private readonly ILinkRepository _linkRepository;

        public LinkController()
        {
            _linkRepository = new LinkRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetLinks()
        {
            var links = _linkRepository.SelectAll();
            return Json(links, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddLink(LinkModel link)
        {
            Link linkEntity = (Link)link; 
            Link addedLinkEntity = _linkRepository.Insert(linkEntity);
            try
            {
                _linkRepository.Save();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult validationError in ex.EntityValidationErrors)
                {
                    Response.Write("Object: " + validationError.Entry.Entity.ToString());
                    Response.Write("");
                    foreach (DbValidationError err in validationError.ValidationErrors)
                    {
                        Response.Write(err.ErrorMessage + "");
                    }
                }
            }
            return Json(addedLinkEntity);
        }

        [HttpPost]
        public ActionResult UpdateLink(LinkModel link)
        {
            Link linkEntity = (Link)link; 
            Link updatedLinkEntity = _linkRepository.Update(linkEntity);
            _linkRepository.Save();

            return Json(updatedLinkEntity);
        }

        [HttpPost]
        public ActionResult RemoveLink(LinkModel link)
        {
            _linkRepository.Delete(link.Id);
            _linkRepository.Save();

            return new EmptyResult();
        }
    }
}