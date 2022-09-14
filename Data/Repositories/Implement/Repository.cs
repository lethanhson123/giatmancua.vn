using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Helpers;

namespace VNPT2021.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {

        private readonly VNPTContext _context;

        public Repository(VNPTContext context)
        {
            _context = context;
        }
        public virtual void Initialization(T model)
        {
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            model.DateUpdated = AppGlobal.InitializationDateTime;
            if (model.Active == null)
            {
                model.Active = false;
            }
        }
        public virtual int Add(T model)
        {
            Initialization(model);
            _context.Set<T>().Add(model);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncAdd(T model)
        {
            Initialization(model);
            _context.Set<T>().Add(model);
            return await _context.SaveChangesAsync();
        }
        public virtual int Update(T model)
        {
            Initialization(model);
            var existModel = GetByID(model.ID);
            if (existModel != null)
            {
                existModel = model;
                _context.Set<T>().Update(existModel);
            }
            return _context.SaveChanges();
        }
        public async Task<int> AsyncUpdate(T model)
        {
            Initialization(model);
            var existModel = await AsyncGetByID(model.ID);
            if (existModel != null)
            {
                existModel = model;
                _context.Set<T>().Update(existModel);
            }
            return await _context.SaveChangesAsync();
        }
        public int Remove(int ID)
        {
            var existModel = GetByID(ID);
            if (existModel != null)
            {
                _context.Set<T>().Remove(existModel);
            }
            return _context.SaveChanges();
        }
        public async Task<int> AsyncRemove(int ID)
        {
            var existModel = await AsyncGetByID(ID);
            if (existModel != null)
            {
                _context.Set<T>().Remove(existModel);
            }
            return await _context.SaveChangesAsync();
        }
        public int AddRange(List<T> list)
        {
            _context.Set<T>().AddRange(list);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncAddRange(List<T> list)
        {
            _context.Set<T>().AddRange(list);
            return await _context.SaveChangesAsync();
        }
        public int RemoveRange(List<T> list)
        {
            _context.Set<T>().RemoveRange(list);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncRemoveRange(List<T> list)
        {
            _context.Set<T>().RemoveRange(list);
            return await _context.SaveChangesAsync();
        }
        public T GetByID(int ID)
        {
            var result = _context.Set<T>().AsNoTracking().FirstOrDefault(model => model.ID == ID);
            return result;
        }
        public async Task<T> AsyncGetByID(int ID)
        {
            var result = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(model => model.ID == ID);
            return result;
        }
        public virtual List<T> GetAllToList()
        {
            var result = _context.Set<T>().ToList();
            return result ?? new List<T>();
        }
        public async Task<List<T>> AsyncGetAllToList()
        {
            var result = await _context.Set<T>().ToListAsync();
            return result ?? new List<T>();
        }
        public virtual List<T> GetByParentIDToList(int parentID)
        {
            var result = _context.Set<T>().Where(model => model.ParentID == parentID).ToList();
            return result;
        }

        public async Task<List<T>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _context.Set<T>().Where(model => model.ParentID == parentID).ToListAsync();
            return result;
        }
        public virtual List<T> GetByActiveToList(bool active)
        {
            var result = _context.Set<T>().Where(model => model.Active == active).ToList();
            return result;
        }
        public async Task<List<T>> AsyncGetByActiveToList(bool active)
        {
            var result = await _context.Set<T>().Where(model => model.Active == active).ToListAsync();
            return result;
        }
        public List<T> GetByPageAndPageSizeToList(int page, int pageSize)
        {
            var result = _context.Set<T>().Skip(page * pageSize).Take(pageSize).ToList();
            return result;
        }
        public async Task<List<T>> AsyncGetByPageAndPageSizeToList(int page, int pageSize)
        {
            var result = await _context.Set<T>().Skip(page * pageSize).Take(pageSize).ToListAsync();
            return result;
        }
    }
}
