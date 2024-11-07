import { UsersService } from "./users.service"
import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepository } from "./users.repositiry";

describe('UsersService',()=>{
    let usersService: UsersService;
    beforeEach(async ()=>{
        const mockFixture:  TestingModule = await Test.createTestingModule(
            {
                providers: [
                    UsersService,
                    {
                        provide: UsersRepository,
                        useValue: 
                            {
                                getAllUsers:jest.fn().mockResolvedValue([
                                                { password: "123", id: 1, username: "User1" },
                                                { password: "123", id: 2, username: "User2" },
                                            ])
                            }
                            
                    },
                ],
            }
        ).compile();
        usersService = mockFixture.get<UsersService>(UsersService);
    })
    it('Tiene que estar definido', async ()=>{
        expect(usersService).toBeDefined();
    });
    it("getAllUsers() devuelve un array", async ()=>{
        expect(await usersService.getAllUsers(1,5)).toEqual([{id: 1, username: "User1"},{id: 2, username: "User2"}]);
    })
})