package com.adrianbadarau.bank

import com.tngtech.archunit.core.importer.ClassFileImporter
import com.tngtech.archunit.core.importer.ImportOption
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses
import org.junit.jupiter.api.Test

class ArchTest {

    @Test
    fun servicesAndRepositoriesShouldNotDependOnWebLayer() {

        val importedClasses = ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.adrianbadarau.bank")

        noClasses()
            .that()
                .resideInAnyPackage("com.adrianbadarau.bank.service..")
            .or()
                .resideInAnyPackage("com.adrianbadarau.bank.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.adrianbadarau.bank.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses)
    }
}
