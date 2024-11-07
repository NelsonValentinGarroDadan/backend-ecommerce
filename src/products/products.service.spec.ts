import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Categories } from "../categories/categories.entity";


describe('ProductsService',()=>{
    let productsService: ProductsService;
    beforeEach(async ()=>{
        const mockFixture:  TestingModule = await Test.createTestingModule(
            {
                providers: [
                    ProductsService,
                    {
                        provide: ProductsRepository,
                        useValue: 
                            {
                                getAllProducts:jest.fn().mockResolvedValue([])
                            }
                            
                    },
                    {
                        provide: getRepositoryToken(Categories),
                        useValue: {
                          findOne: jest.fn().mockResolvedValue({}),
                        },
                      },
                ],
            }
        ).compile();
        productsService = mockFixture.get<ProductsService>(ProductsService);
    })
    it('Tiene que estar definido', async ()=>{
        expect(productsService).toBeDefined();
    });
    it("getAllProducts() devuelve un array", async ()=>{
        expect(await productsService.getAllProducts(1,5)).toEqual([]);
    })
})