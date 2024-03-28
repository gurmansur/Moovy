import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LibraryEntry } from "./LibraryEntry";

@Entity( { name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => LibraryEntry, (libraryEntry) => libraryEntry.user)
    libraryEntry: LibraryEntry[];
}