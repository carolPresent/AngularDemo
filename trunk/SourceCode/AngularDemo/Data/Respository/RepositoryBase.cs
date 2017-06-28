using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Respository
{
    /// <summary>
    /// Class for implementing IRepository methods. Include basic CRUD operations.
    /// </summary>
    /// <typeparam name="TDBContext"></typeparam>
    /// <typeparam name="TEntity"></typeparam>
    public class RepositoryBase<TDBContext,TEntity>:
        IRepository<TEntity>
        where TEntity:class
        where TDBContext:DbContext
    {
        public RepositoryBase(TDBContext context)
        {
            Context = context;
        }
        private TDBContext Context { get; set; }

        /// <summary>
        /// Method to implement ADD operation for database
        /// </summary>
        /// <param name="entity">entity is the name of entity in which new field has to be added</param>
        public void Add(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }

        /// <summary>
        /// Method to find a single row based on where clause
        /// </summary>
        /// <param name="properties">properties is the LINQ expression received from business layer</param>
        /// <returns>Entity on which find operation was done.</returns>
        public TEntity Find(Func<TEntity, bool> where)
        {
            return Context.Set<TEntity>().Where(where).FirstOrDefault();
        }

        /// <summary>
        /// Returns a list of entities based on where clause
        /// </summary>
        /// <param name="where">where is the LINQ expression</param>
        /// <returns>List of entity on which findall operation is done.</returns>
        public List<TEntity> FindAll(Func<TEntity, bool> where)
        {
            return Context.Set<TEntity>().Where(where).ToList();
        }

        /// <summary>
        /// Return list of all the rows in a table.
        /// </summary>
        /// <returns>List of entity on which getall operation is done.</returns>
        public List<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        /// <summary>
        /// Method to get list of entities based on where clause and any one other entity being loaded on basis of foriegn key contraint
        /// </summary>
        /// <param name="where">where is the LINQ expression</param>
        /// <param name="prop">prop is the LINQ expression mentioning the property/entity name ot be loaded</param>
        /// <returns></returns>
        public IQueryable<TEntity> FindOnConstraint(Func<TEntity, bool> where, Expression<Func<TEntity, object>> prop)
        {
            return Context.Set<TEntity>().Include(prop).Where(where).AsQueryable();
        }

        /// <summary>
        /// Method to get list of entities based on where clause and any two other entity being loaded on basis of foriegn key contraint.
        /// </summary>
        /// <param name="where">where is the LINQ expression</param>
        /// <param name="prop0">prop0 is the LINQ expression mentioning the first property/entity name to be loaded</param>
        /// <param name="prop1">prop1 is the LINQ expression mentioning the second property/entity name to be loaded</param>
        /// <returns></returns>
        public IQueryable<TEntity> FindOnConstraint(Func<TEntity,bool> where, Expression<Func<TEntity, object>> prop0, Expression<Func<TEntity, object>> prop1)
        {
            return Context.Set<TEntity>().Include(prop0).Include(prop1).Where(where).AsQueryable();
        }

        /// <summary>
        /// Method updates a row in a database.
        /// </summary>
        /// <param name="item">item is the entity row to be updated in database</param>
        public void Update(TEntity item)
        {
            Context.Entry(item).State = EntityState.Modified;
        }
    }
}
