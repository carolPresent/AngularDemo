namespace Data.Contexts
{
    public class AngularDemoContext : AngularDemoEntities
    {
        public AngularDemoContext()
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }
    }
}
