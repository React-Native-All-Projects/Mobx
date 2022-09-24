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
        static public List<string> users = new List<string>();

        [HttpGet]
        public object getUsers()
        {
            return Ok(users);
        }

        [HttpPost]
        [Route("{user}")]
        public object AddUser(string user)
        {
            users.Add(user);
            return Ok();
        }

        [HttpDelete]
        [Route("{user}")]
        public object DeleteUser(string user)
        {
            users.Remove(user);
            return Ok();
        }

    }
}
