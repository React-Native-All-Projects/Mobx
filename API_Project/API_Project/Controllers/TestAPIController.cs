using API_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestAPIController : Controller
    {
        static public List<User> users = new List<User>();

        [HttpGet]
        public object getUsers()
        {
            return Ok(users);
        }

        [HttpPost]
        public object AddUser(User user)
        {
            users.Add(user);
            return Ok();
        }

        [HttpDelete]
        public object DeleteUser(User userParam)
        {
            var user = users.FirstOrDefault(a => a.Username == userParam.Username);
            users.Remove(user);
            return Ok();
        }

    }
}
