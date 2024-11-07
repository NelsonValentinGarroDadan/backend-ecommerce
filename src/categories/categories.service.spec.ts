import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";


describe('categoriesService',()=>{
    let categoriesService: CategoriesService;
    beforeEach(async ()=>{
        const mockFixture:  TestingModule = await Test.createTestingModule(
            {
                providers: [
                    CategoriesService,
                    {
                        provide: CategoriesRepository,
                        useValue: 
                            {
                                getCategories:jest.fn().mockResolvedValue([])
                            }
                            
                    },
                ],
            }
        ).compile();
        categoriesService = mockFixture.get<CategoriesService>(CategoriesService);
    })
    it('Tiene que estar definido', async ()=>{
        expect(categoriesService).toBeDefined();
    });
    it("getCategories() devuelve un array", async ()=>{
        expect(await categoriesService.getAllCategories()).toEqual([]);
    })
})