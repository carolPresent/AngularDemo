namespace Data.Interfaces
{
    /// <summary>
    /// IUnitOfWork interface. To to be implemented in UnitOfWork class
    /// </summary>
    interface IUnitOFWork
    {
        IRepository<Patient> Patients { get; }
        IRepository<PatientInsurance> PatientInsurances { get; }
        IRepository<Insurance> Insurances { get; }
        IRepository<User> Users { get; }
        IRepository<UserPassword> UserPasswords { get; }
        IRepository<EmailLog> EmailLogs { get; }

        int Complete();
    }
}
