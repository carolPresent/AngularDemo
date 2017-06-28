using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Interfaces
{
    /// <summary>
    /// Repository interface
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T>
    {
        void Add(T item);
        IQueryable<T> FindOnConstraint(Func<T, bool> where, Expression<Func<T, object>> prop);
        IQueryable<T> FindOnConstraint(Func<T, bool> where, Expression<Func<T, object>> prop0, Expression<Func<T, object>> prop1);
        List<T> FindAll(Func<T, bool> where);
        List<T> GetAll();
        void Update(T item);
        T Find(Func<T, bool> where);
    }
}
