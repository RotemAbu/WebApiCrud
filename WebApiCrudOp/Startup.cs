using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebApiCrudOp.Startup))]
namespace WebApiCrudOp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
