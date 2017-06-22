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

        public void Add(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }

        public TEntity Find(Expression<Func<TEntity, object>> properties)
        {

            return Context.Set<TEntity>().Include(properties).SingleOrDefault();
        }

        public TEntity Find(Func<TEntity, bool> where)
        {
            return Context.Set<TEntity>().Where(where).FirstOrDefault();
        }

        public List<TEntity> FindAll(Func<TEntity, bool> properties)
        {
            return Context.Set<TEntity>().Where(properties).ToList();
        }

        public List<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        public IQueryable<TEntity> FindOnConstraint(Func<TEntity, bool> where, Expression<Func<TEntity, object>> prop)
        {
            return Context.Set<TEntity>().Include(prop).Where(where).AsQueryable();
        }

        public IQueryable<TEntity> FindOnConstraint(Func<TEntity,bool> where, Expression<Func<TEntity, object>> prop0, Expression<Func<TEntity, object>> prop1)
        {
            return Context.Set<TEntity>().Include(prop0).Include(prop1).Where(where).AsQueryable();
        }

        public void Update(TEntity item)
        {
            Context.Entry(item).State = EntityState.Modified;
        }

        public void Remove(TEntity item)
        {
            Context.Set<TEntity>().Remove(item);
        }

        public void RemoveRange(params TEntity[] items)
        {
            Context.Set<TEntity>().RemoveRange(items);
        }
    }
}
