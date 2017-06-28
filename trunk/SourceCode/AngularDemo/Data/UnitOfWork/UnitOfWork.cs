using Data.Contexts;
using Data.Interfaces;
using Data.Respository;
using System;

namespace Data.UnitOfWork
{
    /// <summary>
    /// Implements IDisposable and IUnitOfWork.
    /// </summary>
    public class UnitOfWork : IUnitOFWork,IDisposable
    {
        private readonly AngularDemoContext _context;
        private readonly RepositoryBase<AngularDemoContext, Patient> _patients;
        private readonly RepositoryBase<AngularDemoContext, PatientInsurance> _patientInsurances;
        private readonly RepositoryBase<AngularDemoContext, Insurance> _insurances;
        private readonly RepositoryBase<AngularDemoContext, User> _users;
        private readonly RepositoryBase<AngularDemoContext, UserPassword> _userPasswords;
        private readonly RepositoryBase<AngularDemoContext, EmailLog> _emailLogs;

        public UnitOfWork()
        {
            _context = new AngularDemoContext();
            _patients = new RepositoryBase<AngularDemoContext, Patient>(_context);
            _patientInsurances = new RepositoryBase<AngularDemoContext, PatientInsurance>(_context);
            _insurances = new RepositoryBase<AngularDemoContext, Insurance>(_context);
            _users = new RepositoryBase<AngularDemoContext, User>(_context);
            _userPasswords = new RepositoryBase<AngularDemoContext, UserPassword>(_context);
            _emailLogs = new RepositoryBase<AngularDemoContext, EmailLog>(_context);
        }

        public IRepository<Patient> Patients => _patients;

        public IRepository<PatientInsurance> PatientInsurances => _patientInsurances;

        public IRepository<Insurance> Insurances => _insurances;

        public IRepository<User> Users => _users;

        public IRepository<UserPassword> UserPasswords => _userPasswords;

        public IRepository<EmailLog> EmailLogs => _emailLogs;

        /// <summary>
        /// This the commit method which is called just once during a database transaction.
        /// </summary>
        /// <returns></returns>
        public int Complete()
        {
            try
            {
                _context.SaveChanges();
                return 1;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
