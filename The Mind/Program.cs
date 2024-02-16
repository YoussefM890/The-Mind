using The_Mind;
using The_Mind.Controllers;
using The_Mind.Services;

var builder = WebApplication.CreateBuilder(args);
//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            // .AllowAnyOrigin()
        
        );
});
// Add services to the container.
builder.Services.AddSingleton<GameService>();
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR(); // Add this line to add SignalR services

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapHub<GameHub>("/gameHub"); // Map the GameHub SignalR hub

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();




