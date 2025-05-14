import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

@Injectable()
export class RecipesService {
  constructor(private readonly httpService: HttpService) {}

  // TODO: A more flexible filtering method can be implemented
  // by accepting an object with parameters instead of separate arguments.
  // This would allow passing any combination of filters simultaneously.
  // For example: getAvailableRecipes({ ingredient: 'chicken', area: 'Italian' });
  getAvailableRecipes(ingredient?: string, area?: string, category?: string) {
    let url = `${API_URL}search.php?s=`;

    if (ingredient) {
      url = `${API_URL}filter.php?i=${ingredient}`;
    } else if (area) {
      url = `${API_URL}filter.php?a=${area}`;
    } else if (category) {
      url = `${API_URL}filter.php?c=${category}`;
    }

    return this.httpService.get(url).pipe(
      map(response => response.data),
    );
  }

  getRecipeInfo(id: string) {
    const url = `${API_URL}lookup.php?i=${id}`;
    return this.httpService.get(url).pipe(
      map(response => response.data),
    );
  }
}
