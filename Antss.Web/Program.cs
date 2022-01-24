using Antss.Data;
using Antss.Model.Enums;
using Antss.Web.Authorization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(jsonOptions =>
    {
        jsonOptions.SerializerSettings.Converters.Add(new StringEnumConverter());
    }); ;

builder.Services.AddDbContext<AntssContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<EnumTransformer, EnumTransformer>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AntssContext>();
        db.Database.Migrate();
    }
}
else
{
    app.UseHsts();
}

app.UseMiddleware<BasicAuthMiddleware>();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
