export default

`

[Prim "Int"]
[Prim "Str"]

(relation [Class name])
(relation [Extends class superclass])

(rule [Type t] [Prim t])
(rule [Type t] [Class t])

(rule [DirectSubtype subtype t] [Extends subtype t])
(rule [DirectSupertype supertype t] [DirectSubtype t supertype])

(rule [Subtype t t] [Type t]) ; reflexive
(rule [Subtype subtype t] [DirectSubtype subtype t])
(rule [Subtype subtype supertype] [DirectSubtype subtype t] [Subtype t supertype])

(relation [AbstractMethod t name membertype])
(relation [ConcreteMethod t name membertype])
(relation [Property t name membertype])
(rule [Defines t name] [AbstractMethod t name _])
(rule [Defines t name] [ConcreteMethod t name _])
(rule [Defines t name] [Property t name _])
  
(rule [InheritedMethod t name membertype declarationtype conc]
        [DirectSupertype supertype t] [InheritedMethod supertype name membertype declarationtype conc] (not [Defines t name]))  
(rule [InheritedMethod t name membertype supertype #f]
        [DirectSupertype supertype t] [AbstractMethod supertype name membertype] (not [Defines t name]))  
(rule [InheritedMethod t name membertype supertype #t]
        [DirectSupertype supertype t] [ConcreteMethod supertype name membertype] (not [Defines t name]))  
      
(rule [OverridingMethod t name membertype declarationtype]
        [DirectSupertype supertype t] [InheritedMethod supertype name membertype declarationtype _] [Defines t name]) ; 'Defines' iso. 'ConcreteM' to avoid typechecking: same name implies (valid) overriding
(rule [OverridingMethod t name membertype supertype]
        [DirectSupertype supertype t] [AbstractMethod supertype name membertype] [Defines t name])  
(rule [OverridingMethod t name membertype supertype]
        [DirectSupertype supertype t] [ConcreteMethod supertype name membertype] [Defines t name])

(rule [InheritedProperty t name membertype supertype]        
      [DirectSupertype supertype t] [Property supertype name membertype] (not [Defines t name]))  
(rule [InheritedProperty t name membertype declarationtype]
      [DirectSupertype supertype t] [InheritedProperty supertype name membertype declarationtype] (not [Defines t name]))  

(rule [AbstractType t] [AbstractMethod t _ _])
(rule [AbstractType t] [InheritedMethod t _ _ _ #f])
(rule [ConcreteType t] [Type t] (not [AbstractType t]))

(rule [ConcreteSubtype subtype t] [Subtype subtype t] [ConcreteType subtype]) ; refl. because Subtype refl.

(relation [Annotation t membername modelname portname])        
(rule [ResolvedAnnotation t membername membertype modelname portname]
        [ConcreteMethod t membername membertype] [Annotation t membername modelname portname])
(rule [ResolvedAnnotation t membername membertype modelname portname]
        [InheritedMethod t membername membertype declarationtype _] [Annotation declarationtype membername modelname portname])  
(rule [ResolvedAnnotation t membername membertype modelname portname]
        [Property t membername membertype] [Annotation t membername modelname portname])  
(rule [ResolvedAnnotation t membername membertype modelname portname]
        [InheritedProperty t membername membertype declarationtype] [Annotation declarationtype membername modelname portname])  

(rule [ResolvedAnnotation t [Path membername path] membertype modelname portname]
  [Property t membername assoctype] [ConcreteSubtype subtype assoctype] [ResolvedAnnotation subtype path membertype modelname portname])  
(rule [ResolvedAnnotation t [Path membername path] membertype modelname portname]
  [InheritedProperty t membername assoctype _] [ConcreteSubtype subtype assoctype] [ResolvedAnnotation subtype path membertype modelname portname])  

(relation [EventType eventname t])

(relation [Feature model name])
(relation [Label model name])
(rule [Port model name] [Feature model name])
(rule [Port model name] [Label model name])

(rule [FeatureVector eventname model portname subtype path]
  [EventType eventname eventtype] [ConcreteSubtype subtype eventtype]
  [ResolvedAnnotation subtype path membertype model portname]
  [Port model portname])

(rule [FilledPort event model portname t] [FeatureVector event model portname t _])
(rule [IncompleteFeatureVector event model t]
        [EventType event eventtype] [ConcreteSubtype t eventtype] [Port model portname] (not [FilledPort event model portname t]))
(rule [CompleteFeatureVector event model t]
        [EventType event eventtype] [ConcreteSubtype t eventtype] [Port model portname] (not [IncompleteFeatureVector event model t]))
(rule [AmbiguousFeatureVector event model t]
        [FeatureVector event model portname t path1] [FeatureVector event model portname t path2] (!= path1 path2))        

`;