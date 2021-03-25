using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationController : ControllerBase
    {
        private static readonly string[] SerialNumbers = new[]
        {
           "81/2021","81/2021","78/2021","77/2021","76/2021"
        };

        private static readonly string[] Statuses = new[]
{
         "Approved","Approved","Returned","Active","Returned"
        };

        private readonly ILogger<ApplicationController> _logger;

        public ApplicationController(ILogger<ApplicationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Application> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Application
            {
                Date = DateTime.Now.AddDays(index),
                Summary = SerialNumbers[rng.Next(SerialNumbers.Length)],
                Status = Statuses[rng.Next(Statuses.Length)]
            })
            .ToArray();
        }
    }
}
