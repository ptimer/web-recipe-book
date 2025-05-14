import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}
    
    @Get('')
    getAvailableRecipes(@Query('ingredient') ingredient?: string, @Query('area') area?: string, @Query('category') category?: string) {
        return this.recipesService.getAvailableRecipes(ingredient, area, category);
    }

    @Get(':id')
    getRecipeInfo(@Param('id') id: string) {
        return this.recipesService.getRecipeInfo(id);
    }
}
