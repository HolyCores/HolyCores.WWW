var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve the same files locally that GitHub Pages publishes.
// Unknown pages stay 404; this is a multi-page website, not an SPA.
app.UseDefaultFiles();
app.UseStaticFiles();
app.Run();
