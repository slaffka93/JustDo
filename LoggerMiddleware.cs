using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Serilog;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JustDo
{
    public class LoggerMiddleware
    {
        private readonly RequestDelegate _next;


        public LoggerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var content = string.Empty;
            context.Request.EnableBuffering();
            if (context.Request.Method == "POST")
            {
                var reader = new StreamReader(context.Request.Body, encoding: Encoding.UTF8);
                content = await reader.ReadToEndAsync();
                context.Request.Body.Position = 0;
            }
            var obj = new
            {
                User = context.User.FindFirst(ClaimTypes.Email)?.Value ?? "Anonymous",
                RequestId = context.TraceIdentifier,
                Body = !string.IsNullOrEmpty(content) && context.Request.ContentType == "application/json" ?
                JsonConvert.DeserializeObject(content) : null
            };
            Log.Information($"HTTP {context.Request.Method} {context.Request.Path.Value} " +
                $"called {Environment.NewLine}{JsonConvert.SerializeObject(obj, Formatting.Indented)}");
            await _next.Invoke(context);

        }
    }
}