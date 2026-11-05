from django.db import models
from django.utils.text import slugify
from django.utils import timezone


class PortfolioItem(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    client = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    project_date = models.DateField()
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-project_date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        if not self.is_published:
            self.published_at = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
