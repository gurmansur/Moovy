import { IsNotEmpty } from "class-validator";

export class CreateLibraryEntryDto {
    
    @IsNotEmpty()
    imdbId: string;
}