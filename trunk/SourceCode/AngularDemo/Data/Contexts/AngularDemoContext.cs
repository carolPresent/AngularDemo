namespace Data.Contexts
{
    /// <summary>
    /// DB context of database.
    /// </summary>
    public class AngularDemoContext : AngularDemoEntity
    {
        public AngularDemoContext()
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }
    }
}
