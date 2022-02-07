using Antss.Data;
using Antss.Model.Enums;
using Antss.Services;
using Antss.Services.Common;
using Antss.Web.Authorization;
using Antss.Web.Hubs;
using Antss.Web.Push;
using Coravel;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddAuthentication(
    options => options.DefaultScheme = "BasicToken")
    .AddScheme<BasicTokenAuthSchemeOptions, BasicTokenAuthHandler>(
        "BasicToken", options => { });

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(jsonOptions =>
    {
        jsonOptions.SerializerSettings.Converters.Add(new StringEnumConverter());
    }); ;

if (builder.Environment.IsDevelopment())
    builder.Services.AddDbContext<AntssContext>(options =>
         options.EnableSensitiveDataLogging().UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
else
    builder.Services.AddDbContext<AntssContext>(options =>
         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//TODO: Automatically register services according to some selector
builder.Services.AddSingleton<IUserIdProvider, SignalRUserIdProvider>();

builder.Services.AddTransient<EnumTransformer, EnumTransformer>();
builder.Services.AddTransient<Encryptor, Encryptor>();

builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<AuthenticationService, AuthenticationService>();
builder.Services.AddScoped<TicketService, TicketService>();
builder.Services.AddScoped<PushService, PushService>();

builder.Services.AddQueue();
builder.Services.AddTransient<TicketCreatedInvokable>();
builder.Services.AddTransient<TicketUpdatedInvokable>();
builder.Services.AddTransient<UserCreatedInvokable>();
builder.Services.AddTransient<UserUpdatedInvokable>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors(options => options
        .WithOrigins("https://localhost:44469")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());

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

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapHub<MainHub>("signalr");

app.MapFallbackToFile("index.html"); ;

app.Run();
