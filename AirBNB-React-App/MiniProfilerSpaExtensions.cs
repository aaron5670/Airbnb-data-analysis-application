using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using StackExchange.Profiling;

namespace AirBNB_React_App
{
    public static class MiniProfilerSpaExtensions
    {
        public static void MapMiniProfilerIncludes(this IEndpointRouteBuilder endpoints, RenderOptions? options = null,
            string url = "mini-profiler-includes")
        {
            endpoints.MapGet(url, async (context) =>
            {
                context.Response.ContentType = "text/html";
                var includes = MiniProfiler.Current.RenderIncludes(context, options);
                if (string.IsNullOrEmpty(includes.Value))
                    return;

                await context.Response.BodyWriter.WriteAsync(Encoding.UTF8.GetBytes(includes.Value));
            });
        }
    }
}