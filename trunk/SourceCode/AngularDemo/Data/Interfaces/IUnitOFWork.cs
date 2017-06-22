namespace Data.Interfaces
{
    interface IUnitOFWork
    {
        IRepository<Patient> Patients { get; }
        IRepository<PatientInsurance> PatientInsurances { get; }
        IRepository<Insurance> Insurances { get; }
        IRepository<User> Users { get; }
        IRepository<UserPassword> UserPasswords { get; }

        int Complete();
    }
}
