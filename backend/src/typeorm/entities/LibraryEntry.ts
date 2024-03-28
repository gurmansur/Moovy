import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'library_entries'} )
export class LibraryEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imdbId: string;

    @ManyToOne(() => User, (user) => user.libraryEntry)
    user: User;
}